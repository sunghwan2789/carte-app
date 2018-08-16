import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { NavigationStore } from '../stores/navigationStore';
import Navigator from '../components/Navigator';
import NavigateButtons from '../components/NavigateButtons';
import NavigateUnitSelect from '../components/NavigateUnitSelect';
import * as dayjs from 'dayjs';

interface IPropsInjected {
  navigationStore: NavigationStore;
}

@inject('navigationStore')
@observer
class NavigatorContainer extends React.Component {
  handleBackward = () => {
    this.injected.navigationStore.backward();
  }

  handleForward = () => {
    this.injected.navigationStore.forward();
  }

  handleUnitChange = (unit: dayjs.UnitType) => {
    this.injected.navigationStore.navigationUnit = unit;
  }

  get injected() {
    return this.props as IPropsInjected;
  }

  render() {
    const { navigationStore: store } = this.injected;

    return (
      <React.Fragment>
        <NavigateButtons
          handleBackward={this.handleBackward}
          handleForward={this.handleForward} />
        <Navigator currentDate={store.currentDate} navigateUnit={store.navigationUnit} />
      </React.Fragment>
    );
  }
}

export default NavigatorContainer;
