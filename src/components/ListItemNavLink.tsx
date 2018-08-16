import * as React from 'react'
import { ListItem } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { ListItemProps } from '@material-ui/core/ListItem';
import { LocationDescriptor, Location } from 'history';
import { match } from "react-router";
import * as H from 'history';

interface Props extends ListItemProps {
  // ListItemProps and LinkProps both define an 'innerRef' property
  // which are incompatible. Therefore the props `to` and `replace` are
  // simply duplicated here.
  to: LocationDescriptor;
  replace?: boolean;
  activeClassName?: string;
  activeStyle?: React.CSSProperties;
  exact?: boolean;
  strict?: boolean;
  isActive?<P>(match: match<P>, location: Location): boolean;
  location?: Location;
}

function createNavLink({innerRef, ...props}: Props) {
  // Remove `innerRef` from properties as the interface
  // is incompatible. The property `innerRef` should not be
  // needed as the `ListItem` component already provides that
  // feature with a different interface.
  return <NavLink {...props}/>
}

export default class ListItemNavLink extends React.PureComponent<Props> {
  render() {
    return <ListItem {...this.props} component={createNavLink}/>
  }
}
