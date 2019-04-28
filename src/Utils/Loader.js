import React from 'react';
import BarLoader from 'react-spinners/BarLoader';

class Loader extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { isLoading } = this.props;
    return (
      <React.Fragment>
        <BarLoader
          loading={isLoading}
          size={150}
          sizeUnit={'px'}
        />
      </React.Fragment>
    );
  }
}

export default Loader;