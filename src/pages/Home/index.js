import axios from "axios";
import { Button } from "bootstrap";
import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import { useQuery } from "react-query";
const Home = () => {
  const api = "https://jsonplaceholder.typicode.com";

  const [page, setPage] = useState(1);

  const getPost = async () => {
    let response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`
    );
    console.log("response", response);
    return response.data;
  };

  const { isLoading, isError, data, error } = useQuery(["user", page], getPost);
  console.log("data", data);
  return (
    <>
      {" "}
      <Container className="my-2">
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Body</th>
            </tr>
          </thead>

          {isLoading && (
            <tbody>
              <tr>
                <td colSpan={3}>Loading...</td>
              </tr>
            </tbody>
          )}

          <tbody>
            {data &&
              data.map((data) => (
                <tr>
                  <td>{data.id}</td>
                  <td>{data.title}</td>
                  <td>{data.body}</td>
                </tr>
              ))}
          </tbody>
        </Table>

        <Row md={4}>
          <Col>
            {" "}
            <button
              variant="primary"
              disabled={page == 1}
              onClick={() => {
                setPage(page - 1);
              }}
            >
              previous
            </button>
          </Col>
          <Col>
            <button
              variant="primary"
              onClick={() => {
                setPage(page + 1);
              }}
              disabled={page == 10}
            >
              next
            </button>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Home;
