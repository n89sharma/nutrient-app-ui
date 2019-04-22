import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { componentNames as components } from './Utils/Constants';
import ComponentSelector from './ComponentSelector';
import Grid from '@material-ui/core/Grid';

class ApplicationContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enabledComponent: components.FOOD_DIARY
    };
  }

  switchToComponent = (enabledComponent) => {
    this.setState({ enabledComponent: enabledComponent });
  }

  render() {
    return (
      <div>
        <Grid container justify="center">
          <Grid item xl={1}>
            <AppBar position="static">
              <Toolbar variant="dense">

                <Button onClick={() => { this.switchToComponent(components.FOOD_DIARY) }}>
                  Food Diary
                </Button>

                <Button onClick={() => { this.switchToComponent(components.CHECK_IN) }}>
                  Check In
                </Button>

                <Button onClick={() => { this.switchToComponent(components.CUSTOM) }}>
                  Custom
                </Button>

                <Button onClick={() => { this.switchToComponent(components.PROGRESS) }}>
                  Progress
                </Button>

                <Button onClick={() => { this.switchToComponent(components.EXERCISE) }}>
                  Exercise
                </Button>

                <Button onClick={() => { this.switchToComponent(components.ANALYSIS) }}>
                  Analysis
                </Button>

                <Button onClick={() => { this.switchToComponent(components.SETTINGS) }}>
                  Settings
                </Button>

              </Toolbar>
            </AppBar>
          </Grid>

        </Grid>

        <Grid container justify="center">
          <Grid item xl={1}>
          </Grid>
          <ComponentSelector
            enabledComponent={this.state.enabledComponent}
          />
        </Grid>

      </div>
    );
  }
}
export default ApplicationContainer;