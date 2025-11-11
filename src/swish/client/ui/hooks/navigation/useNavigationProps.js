function useNavigationProps(setScreenIndex) {
  return {
    screenChange: (value) => setScreenIndex(value)
  };
}

export default useNavigationProps;
