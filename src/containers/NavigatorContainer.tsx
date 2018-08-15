import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { DateNavigationStore } from '../stores/dateNavigationStore';
import Navigator from '../components/Navigator';
import { action } from 'mobx';

interface IPropsInjected {
  dateNavigationStore: DateNavigationStore;
}

@inject('dateNavigationStore')
@observer
class NavigatorContainer extends React.Component {
  handleBackward = () => {
    this.injected.dateNavigationStore.backward();
  }

  handleForward = () => {
    this.injected.dateNavigationStore.forward();
  }

  get injected() {
    return this.props as IPropsInjected;
  }

  render() {
    const { dateNavigationStore } = this.injected;

    return (
      <Navigator
        currentDate={dateNavigationStore.currentDate}
        handleBackward={this.handleBackward}
        handleForward={this.handleForward}/>
    );
  }
}

export default NavigatorContainer;
