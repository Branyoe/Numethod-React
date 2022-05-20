import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';
import Avatar from '@mui/material/Avatar';
import { blue } from "@mui/material/colors"

import logo from "../assets/logo.png"
import { Container, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import useAppBarStore from '../stores/AppBarStore';

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

export default function AppBarComponent(props) {

  const { currentRoute } = useAppBarStore(state => ({
    currentRoute: state.currentRoute
  }))

  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar sx={{ backgroundColor: blue[900] }}>
          <Toolbar>
            <Box
              sx={{
                paddingRight: 1,
                display: { md: 'flex' }
              }}
            >
              <Link to="/">
                <Avatar src={logo} variant="rounded"></Avatar>
              </Link>
            </Box>
            <Stack width="100%" flexDirection="row">
              <Typography variant="h6">
                Numethod  {currentRoute !== "" && 
                  <>
                    /<Typography variant="subtitle1" component="span">{currentRoute}</Typography>
                  </>
                }
              </Typography>
            </Stack>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
      <Container
        maxWidth={false}
        sx={{
          m: 0,
          pt: 3,
          pb: 3,
        }}
      >
        {props.children}
      </Container>
    </React.Fragment>
  );
}
