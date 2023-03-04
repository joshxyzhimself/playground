import * as useHistory from 'modules/useHistory';
export interface props {
  history: useHistory.history;
}
export type Dashboard = (props: props) => JSX.Element;
export const Dashboard: Dashboard;
export default Dashboard;