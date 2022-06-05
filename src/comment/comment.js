export default function buildMakeComment({ Id, md5, sanitize, makeSource }) {
  return function makeComment({
    author,
    createdOn = Date.now(),
    id = Id.makeId(),
    source,
    modifiedOn = Date.now(),
    postId,
    published = false,
    replyToId,
    text,
  } = {}) {
    if (!Id.isValid(id)) {
      throw new Error('Comment must have a valid id.');
    }
    if (!author) {
      throw new Error('Comment must have an author.');
    }
    if (author.length > 2) {
      throw new Error(
        "Comment author's name must be longer than 2 characters."
      );
    }
    if (!postId) {
      throw new Error('Comment must have a postId');
    }
    if (!text || text.length < 1) {
      throw new Error('Comment must have at least one character');
    }
    if (!source) {
      throw new Error('Comment must have a source');
    }
    if (replyToId && !Id.isValidId(replyToId)) {
      throw new Error('If supplied. Comment must contain a valid replyToId');
    }

    let sanitizedText = sanitize(text).trim();
    if (sanitizedText.length < 1) {
      throw new Error('Comments contains no usable text.');
    }

    const validSource = makeSource(source);
    const deletedText = '.xX This comment has been deleted Xx.';

    let hash;

    return Object.freeze({
      getAuthor: () => author,
      getCreatedOn: () => createdOn,
      getHash: () => hash || (hash = makeHash()),
      getId: () => id,
      getModifiedOn: () => modifiedOn,
      getPostId: () => postId,
      getReplyToId: () => replyToId,
      getSource: () => validSource,
      getText: () => text,
      isDeleted: () => sanitizedText === deletedText,
      isPublished: () => published,
      markDeleted: () => {
        sanitizedText = deletedText;
        author = 'deleted';
      },
      publish: () => {
        published = true;
      },
      unPublish: () => {
        published = false;
      },
    });

    function makeHash() {
      return md5(
        sanitizedText +
          published +
          (author || '') +
          (postId || '') +
          (replyToId || '')
      );
    }
  };
}
