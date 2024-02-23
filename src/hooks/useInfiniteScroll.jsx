const handleScroll = ({
  postLimit,
  postCount,
  setPostLimit,
  increaseLimitBy,
}) => {
  const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 20) {
    if (postLimit <= postCount) {
      setPostLimit(postLimit + increaseLimitBy);
    }
  }
};

const useInfiniteScroll = () => {
  return handleScroll;
};

export default useInfiniteScroll;
