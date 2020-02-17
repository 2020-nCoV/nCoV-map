import Vue from 'vue';
import {
  RadioGroup,
  RadioButton,
  Input,
  Button,
  Form,
  FormItem,
  Row,
  Col,
  Container,
  Image,
  Menu,
  MenuItem,
} from 'element-ui';
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';

Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Input);
Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Row);
Vue.use(Col);
Vue.use(Container);
Vue.use(Image);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.component(CollapseTransition.name, CollapseTransition);
