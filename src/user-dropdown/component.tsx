import * as React from 'react';
import * as classNames from 'classnames';
import { UserSession } from '../core/models/user-session';
import { fetchNewRelease } from '../util/api';
const reddot = require('../img/reddot.svg');
import './component.sass';

export interface PublicProps {
  session: UserSession;
}

export interface ReduxDispatchProps {
  logout: () => void;
}

interface State {
  open?: boolean;
  showNewRelease?: boolean;
  releaseUrl?: string;
}

type Props = PublicProps & ReduxDispatchProps;
export class UserDropdownComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      open: false,
      showNewRelease: false,
      releaseUrl: null,
    }
  }
  private signOut() {
    localStorage.removeItem('rigLogin');
    this.props.logout();
  }
  private toggleDropdown() {
    this.setState({
      open: !this.state.open,
    })
  }
  public componentDidMount() {
    if(process.env.GIT_RELEASE) {
      fetchNewRelease((tagName : string, releaseUrl : string) => {
        if(tagName !== process.env.GIT_RELEASE) {
          this.setState({
            showNewRelease: true,
            releaseUrl,
          });
        }
      }, () => {});
    }
  }
  public render() {
    if (!this.props.session) {
      return null;
    }
    const { login, profileImageUrl } = this.props.session;
    const usernameClasses = classNames({
      'user-dropdown__username': true,
      'open': this.state.open,
    });
    const dropdownClass = classNames({
      'user-dropdown__menu': true,
      'transition': true,
      'open': this.state.open,
    });

    return (
      <div onClick={() => { this.toggleDropdown(); }} className='user-dropdown' tabIndex={0}>
        <div className='user-dropdown__name-container'>
          {this.state.showNewRelease && (
            <img alt='!' title='Rig Update Available' src={reddot} width='8' height='8' />
          )}
          <img alt={login} className='user-dropdown__image' src={profileImageUrl} />
          <div className={usernameClasses}>{login}</div>
        </div>
        <div className={dropdownClass}>
          <ul>
            <li>
              <a target='_blank' href="https://dev.twitch.tv/dashboard/extensions">Extensions Dashboard</a>
            </li>
            <li>
              <a target='_blank' href="https://dev.twitch.tv/docs/extensions/">Documentation</a>
            </li>
            <li>
              <a href='mailto:developers@twitch.tv'>Give Feedback</a>
            </li>
            <li>
              <a target='_blank' href={this.state.releaseUrl}>
                {this.state.showNewRelease ? 'Rig Update Available' : 'Rig Up To Date'}
                {this.state.showNewRelease && (
                  <img alt='!' src={reddot} width='8' height='8' />
                )}
              </a>
            </li>
            <li><hr /></li>
            <li onClick={() => { this.signOut() }}>Sign Out</li>
          </ul>
        </div>
      </div>
    );
  }
}
