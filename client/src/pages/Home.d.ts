import * as useHistory from 'modules/useHistory';
export interface props {
  history: useHistory.history;
}
export type Home = (props: props) => JSX.Element;
export const Home: Home;
export default Home;