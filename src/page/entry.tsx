import { Switch } from 'antd-mobile';
import ReactDOM from 'react-dom';
ReactDOM.render(
  <Switch
    style={{
      '--checked-color': '#67CD67',
      '--height': '30px',
      '--width': '52px',
    }}
  />,
  document.querySelector('#app')
);
