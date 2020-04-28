import * as React from 'react';
import { WithStyles, Theme, createStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Send from '@material-ui/icons/Send';
import { RouteComponentProps, withRouter } from 'react-router';
import { observer } from 'mobx-react';

const styles = (theme: Theme) => createStyles({

  textField: {
    margin: theme.spacing.unit,
  }
});

@observer
class InquiryPage extends React.Component<RouteComponentProps<any> & WithStyles<typeof styles>> {

  handleSend = async (e: any) => {
    e.preventDefault();
    try {
      let res = await fetch(e.target.action, {
        method: e.target.method,
        body: new FormData(e.target),
      });
      let response = await res.text();
      if (response == 'ok') {
        alert('고객님의 목소리가 전달됐습니다.\n의견 고맙습니다.');
      } else if (response == 'email') {
        alert('수신 가능한 이메일 주소를 입력해주세요.');
      } else {
        alert('서버 프로그램에 문제가 발생하여 목소리를 전달하지 못했습니다.');
      }
    } catch ($e) {
      alert('목소리를 전달하지 못했습니다.');
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <form action="/carte/send.php" method="post" onSubmit={this.handleSend}>
        <AppBar position="sticky">
          <Toolbar>
            <IconButton color="inherit" onClick={this.props.history.goBack}>
              <ArrowBack />
            </IconButton>
            <Typography variant="title" color="inherit" style={{flexGrow:1}}>의견 보내기</Typography>
            <IconButton color="inherit" type="submit">
              <Send />
            </IconButton>
          </Toolbar>
        </AppBar>
        <main>
          <TextField margin="normal" name="email" type="email" label="고객님 이메일 주소" required fullWidth onKeyDown={e=>e.keyCode===13&&e.preventDefault()} />
          <TextField margin="normal" name="message" label="불만사항 및 건의사항 및 사랑 고백" rows={8} required multiline fullWidth />
          <Typography variant="caption">
            고객님의 소중한 의견은 개발자에게 직접 전달됩니다.
            사소한 것도 괜찮아요//
            우리 학교 밥이 너무 맛있다든가
            개발을 도와주고 싶다든가
            디자인을 도와주고 싶다든가든가든가든 둥둥두두둥두두둑
            등등 맘 편히 보내주세요. 흐흐.
          </Typography>
        </main>
      </form>
    );
  }
}

export default withStyles(styles)(withRouter(InquiryPage));
