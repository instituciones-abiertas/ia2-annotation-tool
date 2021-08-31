import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  createStyles,
  makeStyles,
  Paper,
  Chip,
  Avatar,
} from "@material-ui/core";
import Mousetrap from "mousetrap";

const useMouseTrap = function useMousetrap(keybindings) {
  useEffect(() => {
    Object.entries(keybindings).forEach(([key, fn]) =>
      Mousetrap.bind(`${key}`, (e) => {
        e.preventDefault();
        return fn(e);
      })
    );
    return () =>
      Object.keys(keybindings).forEach((key) => Mousetrap.unbind(key));
  }, [keybindings]);
};

const useStyles = makeStyles((theme) =>
  createStyles({
    chip: {
      margin: theme.spacing(0.5),
    },
    chipRoot: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      listStyle: "none",
      padding: theme.spacing(0.5),
    },
  })
);

const colorDefault = "#e0e0e0";
const colorSelection = "red";

export default function EntitiesSelector({ entities, selected, onChange }) {
  const setEntities = (items, id) => {
    return items.map((item) => {
      if (item.id === id) {
        return { ...item, color: colorSelection };
      }
      return { ...item, color: colorDefault };
    });
  };

  const classes = useStyles();
  const [list, setList] = useState([]);
  const key = [
    "ctrl+1",
    "ctrl+2",
    "ctrl+3",
    "ctrl+4",
    "ctrl+5",
    "ctrl+6",
    "ctrl+7",
    "ctrl+8",
    "ctrl+9",
  ];
  const events = Object.fromEntries(
    entities.map((e, idx) => [
      String(key[idx]),
      () => {
        setList(setEntities(entities, e.id));
        onChange(e.name);
      },
    ])
  );
  useMouseTrap(events);

  useEffect(() => {
    setList(setEntities(entities, selected));
  }, [entities, selected]);

  const handleClick = (event, id, name) => {
    setList(setEntities(list, id));
    onChange(name);
  };

  const renderShortCut = (txt) => <Avatar>{txt}</Avatar>;
  return (
    <Paper component="ul" className={classes.chipRoot}>
      {list.map((e, idx) => {
        return (
          <li key={e.id}>
            <Chip
              size="small"
              label={e.name}
              avatar={renderShortCut(key[idx])}
              className={classes.chip}
              style={{ backgroundColor: e.color }}
              onClick={(event) => handleClick(event, e.id, e.name)}
            />
          </li>
        );
      })}
    </Paper>
  );
}

EntitiesSelector.propTypes = {
  entities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      description: PropTypes.string,
      should_anonimyzation: PropTypes.bool,
      enable_multiple_selection: PropTypes.bool,
    })
  ),
  selected: PropTypes.number,
  onChange: PropTypes.func,
};

EntitiesSelector.defaultProps = {
  entities: [],
  selected: 0,
  onChange: () => true,
};
