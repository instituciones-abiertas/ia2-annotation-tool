import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  FormControl,
  createStyles,
  makeStyles,
  Select,
  MenuItem,
  DialogContentText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
  InputLabel,
  Chip,
  useTheme,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {
  selectAnonymizer,
  clearDeleteAnnotations,
  clearNewAnnotations,
} from "../Editor/anonymizerSlice";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    chips: {
      display: "flex",
      flexWrap: "wrap",
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
    container: {
      display: "flex",
      flexWrap: "wrap",
    },
    formControl: {
      margin: theme.spacing(1),
      width: "60%",
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
        backgroundColor: "none",
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
    },
    selectorIcon: {
      color: theme.palette.primary.main,
      paddingRight: theme.spacing(1),
    },
    button: {
      fontWeight: "bold",
      width: "max-content",
      borderRadius: theme.spacing(10),
      color: theme.palette.secondary.main,
      backgroundColor: theme.palette.primary.main,
      paddingRight: theme.spacing(2),
      paddingLeft: theme.spacing(2),
      "&:hover": {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
      },
    },
  })
);

function getStyles(name, selectedTag, theme) {
  return {
    fontWeight:
      selectedTag.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleEntitiesSelector({ onMultipleSelection }) {
  const anonymizerState = useSelector(selectAnonymizer);
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const filteredTags = anonymizerState.tags.filter(
    (tag) => tag.enable_multiple_selection
  );
  const [open, setOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState(["PER"]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setSelectedTags(event.target.value);
  };

  const handleUpdate = () => {
    onMultipleSelection(
      anonymizerState.newAnnotations,
      anonymizerState.deleteAnnotations,
      selectedTags.map((tagName) => {
        return filteredTags.find((tag) => tag.name === tagName).id;
      })
    );
    dispatch(clearNewAnnotations());
    dispatch(clearDeleteAnnotations());
  };

  return (
    <div>
      <Button
        variant="contained"
        className={classes.button}
        onClick={handleClickOpen}
      >
        Selección múltiple
      </Button>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
          Selecciona las etiquetas para comenzar la búsqueda de todas las
          ocurrencias
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Esta funcionalidad ayuda a agilizar el proceso de selección de
            entidades que se repitan en el documento. A través de esta acción
            serán detectadas todas las ocurrencias de cada una de las entidades
            actualmente marcadas. El proceso puede tomar tiempo.
          </DialogContentText>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel id="mutiple-chip-label">
                Etiquetas seleccionadas
              </InputLabel>
              <Select
                className={classes.selector}
                placeholder="Haz click para seleccionar"
                color="secondary"
                classes={{
                  icon: classes.selectorIcon,
                  select: classes.selectInput,
                }}
                labelId="mutiple-chip-label"
                id="mutiple-chip"
                multiple
                label="Standard"
                value={selectedTags || "Haz click para seleccionar"}
                onChange={handleChange}
                input={
                  <Input
                    placeholder="Haz click para seleccionar"
                    id="select-multiple-chip"
                  />
                }
                renderValue={(selected) => (
                  <div className={classes.chips}>
                    {selected.map((value) => (
                      <Chip
                        key={value}
                        label={value}
                        className={classes.chip}
                      />
                    ))}
                  </div>
                )}
                MenuProps={MenuProps}
              >
                {filteredTags.map((tag) => (
                  <MenuItem
                    key={tag.name}
                    value={tag.name}
                    style={getStyles(tag.name, selectedTags, theme)}
                  >
                    {tag.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Atrás
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Buscar todas
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

MultipleEntitiesSelector.propTypes = {
  onMultipleSelection: PropTypes.func.isRequired,
};
