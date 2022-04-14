import { Container } from "@mantine/core";
import { ArticleCardImage } from "components/BlogPreview";


const blogPosts = [{
  title: "test",
  image: "https://http.cat/404",
  category: "test"
}]

export default function BlogPage() {
  return (
    <>
      <Container>
        <h1>/blog</h1>
        {
          blogPosts.map(post => (
            <ArticleCardImage {...post} />
          ))
        }
      </Container>
    </>
  );
}
