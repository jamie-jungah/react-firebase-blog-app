import Footer from "components/Footer";
import Header from "components/Header";
import PostList from "components/PostList";

export default function Posts() {
  return (
    <>
      <Header />
      <PostList hasNavigation={false} />
      <Footer />
    </>
  );
}
