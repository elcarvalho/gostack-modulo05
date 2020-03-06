import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import api from '../../services/api';

import Container from '../../components/container';
import { Loading, Owner, IssueList, Filters, FilterButton } from './styles';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    loading: true,
    repoName: '',
    state: 'open',
  };

  async componentDidMount() {
    const { match } = this.props;
    const { state } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    this.setState({ repoName });

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state,
          per_page: 5,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  handleFilter = async newState => {
    const { repoName, state } = this.state;

    if (newState === state) {
      return;
    }

    const issues = await api.get(`/repos/${repoName}/issues`, {
      params: {
        newState,
        per_page: 5,
      },
    });

    this.setState({
      issues: issues.data,
      loading: false,
      state: newState,
    });
  };

  render() {
    const { repository, issues, loading, state } = this.state;

    if (loading) {
      return <Loading>Carregando</Loading>;
    }
    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <Filters>
          <FilterButton
            color="#3498db"
            hover="#2980b9"
            selected={state === 'all'}
            onClick={() => this.handleFilter('all')}
          >
            Todas
          </FilterButton>
          <FilterButton
            color="#1abc9c"
            hover="#16a085"
            selected={state === 'open'}
            onClick={() => this.handleFilter('open')}
          >
            Abertas
          </FilterButton>
          <FilterButton
            color="#e67e22"
            hover="#d35400"
            selected={state === 'closed'}
            onClick={() => this.handleFilter('closed')}
          >
            Fechadas
          </FilterButton>
        </Filters>

        <IssueList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img
                src={issue.user.avatar_url}
                alt={issue.user.login}
                srcSet=""
              />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>
      </Container>
    );
  }
}
