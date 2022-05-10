import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function CardCategory(props) {
  const classes = useStyles();

  return (
    <li>{props.value.name}
                <ul>
                    <li>
                    {props.value.description}
                    </li>
                    <li>
                    {props.value.image}
                    </li>
                </ul>
            </li>
  );
}
