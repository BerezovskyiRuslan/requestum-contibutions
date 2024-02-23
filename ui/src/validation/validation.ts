export const validateGithubUrl = (url: string): boolean => {
  const isGitHub = /^https:\/\/github\.com/i.test(url);
  const isCorrectLengthUrlGithub = url.split('/').length;

  if (!isGitHub) {
    return false;
  }

  if(isCorrectLengthUrlGithub !== 5) {
    return false;
  }

  return true
}