export function getUrlPageNumber() {
  let pageNumber;

  const params = new URL(location.href);
  const page = params.searchParams.get('page');

  if (!page) {
    return (pageNumber = 0);
  }

  try {
    pageNumber = parseInt(page) - 1;
    if (isNaN(pageNumber)) {
      throw new Error('page can be only numbers');
    }
  } catch (err) {
    console.log(err);
    pageNumber = 0;
  }

  return pageNumber;
}
