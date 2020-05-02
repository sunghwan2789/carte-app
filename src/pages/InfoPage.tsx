import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Refresh from '@material-ui/icons/Refresh';
import React from 'react';
import { Link } from 'react-router-dom';
import BackTopBar from '../components/BackTopBar';

const useStyles = makeStyles((theme) => createStyles({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function InfoPage() {
  const classes = useStyles();

  return (
    <div>
      <BackTopBar>
        <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
          정보
        </Typography>
      </BackTopBar>
      <main>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMore />}>
            <Typography className={classes.heading}>
              인터넷에 연결하지 않아도 되나요?
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div>
              <Typography paragraph>
                네!
                {' '}
                <strong>전국 학교 식단표</strong>
                는 여러분의 데이터를 아끼기 위해 특별하게 만들어졌습니다.
              </Typography>
              <Typography paragraph>
                일단, 인터넷에서 받은 데이터는 언제든 재활용하도록 되어있어요.
                특히 식단표는 한 달 분량을 미리 받아 놓는답니다! 혹시나 받아 놓은 데이터가
                오래되었거나 이상하면 그 페이지의 새로고침(
                <Refresh fontSize="inherit" />
                ) 버튼을 눌러주세요. 그러면 인터넷에서 새로운 데이터를 받아와요.
              </Typography>
              <Typography paragraph>
                그러니까, 북마크에 추가하시거나 홈 화면 바로가기로 추가하시면 더 편리하게
                사용하실 수 있는 거죠! 흠흠.
              </Typography>
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMore />}>
            <Typography className={classes.heading}>
              음식 뒤에 숫자는 무슨 의미인가요?
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div>
              <Typography paragraph>
                교육청에서 발췌한 알레르기 정보에요.
                <Link to="/highlights">하이라이트</Link>
                {' '}
                기능으로 주의할 음식을 표시해보세요! 미리 확인하고 아프지 맙시다...
              </Typography>
              <Grid container>
                {[
                  '1.난류',
                  '2.우유',
                  '3.메밀',
                  '4.땅콩',
                  '5.대두',
                  '6.밀',
                  '7.고등어',
                  '8.게',
                  '9.새우',
                  '10.돼지고기',
                  '11.복숭아',
                  '12.토마토',
                  '13.아황산류',
                  '14.호두',
                  '15.닭고기',
                  '16.쇠고기',
                  '17.오징어',
                  '18.조개류(굴,전복,홍합 포함)',
                ].map((item, index) => (
                  <Grid key={index} item xs={4} sm={2}>
                    <Typography>{item}</Typography>
                  </Grid>
                ))}
              </Grid>
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMore />}>
            <Typography className={classes.heading}>
              음식 뒤에 이상한 글자가... "고"? "조"? 뭐죠?
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div>
              <Typography paragraph>앗... 아아...</Typography>
              <Typography paragraph>
                <strong>전국 학교 식단표</strong>
                는 나이스에서 식단표를 가져옵니다. 이 식단표를 작성하시는 분께서 "고"나 "조" 같은
                이해할 수 없는 글자를 입력하신 것으로 보이네요... 대충 걸러서 봐주세요... ㅎ하.
              </Typography>
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMore />}>
            <Typography className={classes.heading}>
              하이라이트는 어떤 순서로 적용되나요?
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div>
              <Typography paragraph>
                <Link to="/highlights">하이라이트</Link>
                는 오름차순으로 적용합니다. 즉, 위에 있는 규칙을 우선하여 적용하는 것이죠. 차후,
                목록 재정렬 기능을 추가할 예정입니다.
              </Typography>
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </main>
    </div>
  );
}
