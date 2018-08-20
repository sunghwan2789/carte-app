import * as React from 'react';
import { WithStyles, Theme, createStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Grid from '@material-ui/core/Grid';
import ArrowBack from '@material-ui/icons/ArrowBack';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Refresh from '@material-ui/icons/Refresh';
import { RouteComponentProps, withRouter } from 'react-router';
import { observer } from 'mobx-react';

const styles = (theme: Theme) => createStyles({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});

@observer
class InfoPage extends React.Component<RouteComponentProps<any> & WithStyles<typeof styles>> {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <AppBar position="sticky">
          <Toolbar>
            <IconButton color="inherit" onClick={this.props.history.goBack}>
              <ArrowBack />
            </IconButton>
            <Typography variant="title" color="inherit" style={{flexGrow:1}}>정보</Typography>
          </Toolbar>
        </AppBar>
        <main>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMore />}>
              <Typography className={classes.heading}>인터넷에 연결하지 않아도 되나요?</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div>
                <Typography paragraph>
                  네! <strong>전국 학교 식단표</strong>는 여러분의 데이터를 아끼기 위해 특별하게 만들어졌습니다.
                </Typography>
                <Typography paragraph>
                  일단, 인터넷에서 받은 데이터는 언제든 재활용하도록 되어있어요.
                  특히 식단표는 한 달 분량을 미리 받아 놓는답니다!
                  혹시나 받아 놓은 데이터가 오래되었거나 이상하면
                  그 페이지의 새로고침(<Refresh fontSize="inherit" />) 버튼을 눌러주세요.
                  그러면 인터넷에서 새로운 데이터를 받아와요.
                </Typography>
                <Typography paragraph>
                  그러니까, 북마크에 추가하시거나 홈 화면 바로가기로 추가하시면 더 편리하게 사용하실 수 있는 거죠! 흠흠.
                </Typography>
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMore />}>
              <Typography className={classes.heading}>음식 뒤에 숫자는 무슨 의미인가요?</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div>
                <Typography paragraph>
                  교육청에서 발췌한 알레르기 정보에요.
                  {/*<Link to="/highlights">*/}하이라이트{/*</Link>*/} 기능으로 주의할 음식을 표시해보세요!
                  미리 확인하고 아프지 맙시다...
                </Typography>
                <Grid container>
                  <Grid item xs={4} sm={2}><Typography>1.난류</Typography></Grid>
                  <Grid item xs={4} sm={2}><Typography>2.우유</Typography></Grid>
                  <Grid item xs={4} sm={2}><Typography>3.메밀</Typography></Grid>
                  <Grid item xs={4} sm={2}><Typography>4.땅콩</Typography></Grid>
                  <Grid item xs={4} sm={2}><Typography>5.대두</Typography></Grid>
                  <Grid item xs={4} sm={2}><Typography>6.밀</Typography></Grid>
                  <Grid item xs={4} sm={2}><Typography>7.고등어</Typography></Grid>
                  <Grid item xs={4} sm={2}><Typography>8.게</Typography></Grid>
                  <Grid item xs={4} sm={2}><Typography>9.새우</Typography></Grid>
                  <Grid item xs={4} sm={2}><Typography>10.돼지고기</Typography></Grid>
                  <Grid item xs={4} sm={2}><Typography>11.복숭아</Typography></Grid>
                  <Grid item xs={4} sm={2}><Typography>12.토마토</Typography></Grid>
                  <Grid item xs={4} sm={2}><Typography>13.아황산류</Typography></Grid>
                  <Grid item xs={4} sm={2}><Typography>14.호두</Typography></Grid>
                  <Grid item xs={4} sm={2}><Typography>15.닭고기</Typography></Grid>
                  <Grid item xs={4} sm={2}><Typography>16.쇠고기</Typography></Grid>
                  <Grid item xs={4} sm={2}><Typography>17.오징어</Typography></Grid>
                  <Grid item xs={4} sm={2}><Typography>18.조개류(굴,전복,홍합 포함)</Typography></Grid>
                </Grid>
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMore />}>
              <Typography className={classes.heading}>음식 뒤에 이상한 글자가... "고"? "조"? 뭐죠?</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div>
                <Typography paragraph>
                  앗... 아아...
                </Typography>
                <Typography paragraph>
                  <strong>전국 학교 식단표</strong>는 나이스에서 식단표를 가져옵니다.
                  이 식단표를 작성하시는 분께서 "고"나 "조" 같은 이해할 수 없는 글자를 입력하신 것으로 보이네요...
                  대충 걸러서 봐주세요... ㅎ하.
                </Typography>
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(InfoPage));
