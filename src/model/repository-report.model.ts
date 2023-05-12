export interface RepositoryReport {
  openIssues?: Report
  closedIssues?: Report
  openPullRequest?: Report
  closedPullRequest?: Report
  mergedPullRequest?: Report
  collaborators?: Report
  watchers?: Report
  forks?: Report
  stargazers?: Report
}

export interface Report {
  totalCount: number
}
