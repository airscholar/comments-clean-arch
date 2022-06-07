import { listComments } from '../use-cases';
import makeGetComments from './get-comments';

const getComments = makeGetComments(listComments);
const commentController = Object.freeze({
  getComments,
});

export default commentController;
export { getComments };
