import {
  Breadcrumbs,
  Chip,
  emphasize,
  Toolbar,
  withStyles,
} from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";

const StyledBreadcrumb = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[300],
    height: theme.spacing(3),
    color: theme.palette.grey[800],
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: theme.palette.grey[300],
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(theme.palette.grey[300], 0.12),
    },
  },
}))(Chip);

function AppBreadcrumb({ links }) {
  const history = useHistory();

  return (
    <Toolbar variant="dense">
      <Breadcrumbs>
        {links.map((link) => (
          <StyledBreadcrumb
            component="a"
            href={link.link}
            label={link.label}
            icon={link.icon}
            onClick={(e) => {
              e.preventDefault();
              history.push(link.link);
            }}
          />
        ))}
      </Breadcrumbs>
    </Toolbar>
  );
}

export default AppBreadcrumb;
