import { TextAnnotator } from "@ia2coop/ia2-react-text-annotate";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { Provider, useSelector, useDispatch } from "react-redux";
import { combineReducers } from "redux";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { ActionCreators as UndoActionCreators } from "redux-undo";
import {
  Select,
  FormControl,
  MenuItem,
  Box,
  createStyles,
  makeStyles,
  Paper,
  Typography,
  IconButton,
} from "@material-ui/core";
import RedoIcon from "@material-ui/icons/Redo";
import UndoIcon from "@material-ui/icons/Undo";
import anonymizerReducer, {
  selectAnonymizer,
  updateAnnotations,
  updateNewAnnotations,
  updateDeleteAnnotations,
  removeNewAnnotations,
  removeDeleteAnnotations,
  updateSelectTag,
  updateTags,
  updateAnalysisSuccess,
} from "./anonymizerSlice";
import Instructions from "../Instructions";
import MultipleEntitiesSelector from "../MultipleEntitiesSelector";
import styles from "./Editor.module.css";

const createRootReducer = () => {
  return combineReducers({
    anonymizer: anonymizerReducer,
  });
};

const rootReducer = createRootReducer();
const middleware = [...getDefaultMiddleware()];

export const configuredStore = (initialState) => {
  const store = configureStore({
    reducer: rootReducer,
    middleware,
    preloadedState: initialState,
  });

  return store;
};

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      minWidth: theme.spacing(85),
      [theme.breakpoints.up("lg")]: {
        marginRight: theme.spacing(40),
        marginLeft: theme.spacing(40),
      },
      [theme.breakpoints.down("lg")]: {
        marginRight: theme.spacing(20),
        marginLeft: theme.spacing(20),
      },
      [theme.breakpoints.down("md")]: {
        marginRight: theme.spacing(8),
        marginLeft: theme.spacing(8),
      },
    },
    selectInput: {
      display: "flex",
      flexDirection: "row",
      backgroundColor: theme.palette.common.white,
      borderRadius: theme.spacing(10),
      color: theme.palette.secondary.main,
      padding: theme.spacing(1, 3),
      fontSize: "medium",
      fontWeight: "bold",
      "&:hover, &:focus": {
        color: theme.palette.primary.main,
        borderRadius: theme.spacing(10),
      },
    },
    selectIcon: {
      color: theme.palette.primary.main,
      paddingRight: theme.spacing(2),
    },
    selector: {
      [theme.breakpoints.down("lg")]: {
        width: theme.spacing(30),
      },
      [theme.breakpoints.up("lg")]: {
        width: theme.spacing(50),
      },
    },
    tagDescription: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      overflow: "hidden",
    },
    tagTitle: {
      marginRight: theme.spacing(1),
    },
    selectorContainer: {
      flexGrow: 1,
      marginRight: theme.spacing(2),
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
    },
    selectorIcon: {
      color: theme.palette.primary.main,
      paddingRight: theme.spacing(1),
    },
    root: {
      "& > *": {
        marginBottom: theme.spacing(4),
        height: theme.spacing(50),
        [theme.breakpoints.down("lg")]: {
          height: theme.spacing(20),
        },
        [theme.breakpoints.down("md")]: {
          height: theme.spacing(16),
        },
      },
    },
    rightActions: {
      right: 0,
      position: "absolute",
      [theme.breakpoints.up("lg")]: {
        transform: "translateX(-350px)",
      },
      [theme.breakpoints.down("lg")]: {
        transform: "translateX(-230px)",
      },
      [theme.breakpoints.down("md")]: {
        transform: "translateX(-100px)",
      },
    },
  })
);

const Editor = ({
  style,
  annotations,
  tags,
  text,
  multipleSelectionEnable,
  onMultipleSelection,
}) => {
  const { present, future, past } = useSelector(selectAnonymizer);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(updateTags(tags));
    const annotationsMap = annotations.map((ent) => {
      return {
        ...ent,
        class: ent.should_anonymized ? styles.anonymousmark : styles.mark,
      };
    });
    dispatch(updateAnalysisSuccess({ ents: annotationsMap, text }));
    dispatch(updateSelectTag(tags[0].name));
  }, [dispatch, annotations, tags, text]);

  const [selectedTag, setSelectedTag] = useState(tags[0]?.name);

  const renderMultipleEntitiesSelector = () => {
    return (
      <MultipleEntitiesSelector onMultipleSelection={onMultipleSelection} />
    );
  };

  const handleTagSelection = (event) => {
    dispatch(updateSelectTag(event.target.value));
    setSelectedTag(event.target.value);
  };

  const onUndo = () => {
    dispatch(UndoActionCreators.undo());
  };

  const onRedo = () => {
    dispatch(UndoActionCreators.redo());
  };

  const renderUndoRedo = () => {
    const dispatchPrevios = 3;
    const canUndo = past.length > dispatchPrevios;
    const canRedo = future.length > 0;
    return (
      <Box className={classes.rightActions}>
        <IconButton aria-label="undo" onClick={onUndo} disabled={!canUndo}>
          <UndoIcon />
        </IconButton>
        <IconButton aria-label="redo" onClick={onRedo} disabled={!canRedo}>
          <RedoIcon />
        </IconButton>
      </Box>
    );
  };

  const renderSelect = () => {
    return (
      <FormControl className={classes.selectorContainer} color="secondary">
        <Select
          label="TAG"
          fullWidth
          labelId="tag"
          id="tag"
          value={selectedTag}
          onChange={(event) => handleTagSelection(event)}
          className={classes.selector}
          defaultValue=""
          color="secondary"
          classes={{ icon: classes.selectorIcon, select: classes.selectInput }}
          disableUnderline
          style={{ display: "flex", alignSelf: "flex-end", margin: "24px" }}
        >
          {present.tags.map((tag) => {
            return (
              <MenuItem key={tag.id} value={tag.name} id={tag.id}>
                <Typography
                  component="h1"
                  variant="subtitle1"
                  className={classes.tagTitle}
                >
                  {tag.name}
                </Typography>
                <Typography
                  component="h1"
                  variant="subtitle1"
                  className={classes.tagDescription}
                >
                  {tag.description}
                </Typography>
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    );
  };

  const handleEntitySelection = (value, span) => {
    // Check if annotations exist in deleteAnnotations array
    if (
      present.deleteAnnotations.some(
        (annot) =>
          annot.start === span.start &&
          annot.end === span.end &&
          annot.tag === span.tag
      )
    ) {
      // Remove a delete annotation and update annotations by show in editor
      dispatch(removeDeleteAnnotations(span));
      dispatch(updateAnnotations([...present.annotations.concat([span])]));
    } else {
      // Update new annotations by show in editor
      dispatch(updateNewAnnotations([span]));
    }
  };

  const handleDelete = (index, value) => {
    // Check if annotations exist in newAnnotations array
    if (
      present.newAnnotations.some(
        (annot) => annot.start === value.start && annot.end === value.end
      )
    ) {
      dispatch(removeNewAnnotations(value));
    } else {
      // Add a delete annotation and update annotations by don't show in editor
      dispatch(updateDeleteAnnotations([present.annotations[index]]));
      dispatch(
        updateAnnotations([
          ...present.annotations.slice(0, index),
          ...present.annotations.slice(index + 1),
        ])
      );
    }
    return null;
  };

  const handleClick = (index, value) => {
    handleDelete(index, value);
  };

  return (
    <Box>
      <div className={classes.container}>
        <Instructions
          title="Selecciona una etiqueta"
          subtitle="Luego elimina, agrega o corrige las entidades identificadas. IA² detecta las etiquetas y realizará las siguientes acciones con cada una según su color:"
          // Hardcodeados los colores y los textos, pensar si no hacer un servicio de backend,que brinde los colores y los textos
          legends={[
            {
              id: 1,
              color: "#00D6A1",
              description: "Anonimizar",
            },
            {
              id: 2,
              color: "#ffca00",
              description: "No anonimizar",
            },
          ]}
        >
          <div className={classes.selectorContainer}>
            {renderSelect()}
            {multipleSelectionEnable && renderMultipleEntitiesSelector()}
          </div>
        </Instructions>
        <div className={classes.root}>
          {renderUndoRedo()}
          <Paper elevation={5}>
            <TextAnnotator
              tabIndex={0}
              editableContent
              doubleTaggingOff
              style={style}
              content={present.text}
              value={present.annotations.concat(present.newAnnotations)}
              onChange={(value, span) => handleEntitySelection(value, span)}
              getSpan={(span) => ({
                ...span,
                should_anonymized: present.selectTag.should_anonimyzation,
                human_marked_ocurrency: true,
                tag: selectedTag,
                class: present.selectTag.should_anonimyzation
                  ? styles.anonymousmark
                  : styles.mark,
              })}
              markStyle={styles}
              markClass={styles.mark}
              handleClick={(index, value) => handleClick(index, value)}
              withCompletedWordSelection
            />
          </Paper>
        </div>
      </div>
    </Box>
  );
};

Editor.propTypes = {
  style: PropTypes.shape({}),
  annotations: PropTypes.arrayOf(PropTypes.shape({})),
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      description: PropTypes.string,
      should_anonimyzation: PropTypes.bool,
    })
  ),
  text: PropTypes.string.isRequired,
  multipleSelectionEnable: PropTypes.bool,
  onMultipleSelection: PropTypes.func,
};

Editor.defaultProps = {
  style: {},
  annotations: [],
  tags: [],
  multipleSelectionEnable: false,
  onMultipleSelection: () => true,
};

const WrappedEditor = ({
  style,
  annotations,
  tags,
  text,
  onAnnotationsChange,
  multipleSelectionEnable,
  onMultipleSelection,
}) => {
  const store = configuredStore();

  useEffect(() => {
    const subscribeAnnotations = () => {
      let currentD;
      let currentNa;
      return store.subscribe(() => {
        const prevD = currentD;
        const prevNa = currentNa;
        currentNa = store.getState().anonymizer.newAnnotations;
        currentD = store.getState().anonymizer.deleteAnnotations;
        if (prevD !== currentD || prevNa !== currentNa) {
          onAnnotationsChange(currentD, currentNa);
        }
      });
    };
    const unsubscribe = subscribeAnnotations();
    return () => unsubscribe();
  }, [onAnnotationsChange, store]);

  return (
    <Provider store={store}>
      <Editor
        style={style}
        text={text}
        tags={tags}
        annotations={annotations}
        multipleSelectionEnable={multipleSelectionEnable}
        onMultipleSelection={onMultipleSelection}
      />
    </Provider>
  );
};

WrappedEditor.propTypes = {
  style: PropTypes.shape({}),
  annotations: PropTypes.arrayOf(PropTypes.shape({})),
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      description: PropTypes.string,
      should_anonimyzation: PropTypes.bool,
    })
  ),
  text: PropTypes.string.isRequired,
  onAnnotationsChange: PropTypes.func,
  multipleSelectionEnable: PropTypes.bool,
  onMultipleSelection: PropTypes.func,
};

WrappedEditor.defaultProps = {
  style: {},
  annotations: [],
  tags: [],
  multipleSelectionEnable: false,
  onMultipleSelection: () => true,
  onAnnotationsChange: () => true,
};

export default WrappedEditor;
