

// reactstrap components
import { 
   Row,
    Col
       } from "reactstrap";

const Footer = () => {
  return (
    <footer style={{bottom:"10%",position:"fixed",display:"flex"}}>
      <Row className="">
        <Col>
          <div className="">
            © {new Date().getFullYear()}{" "}
              Developer Bazaar Technologies
          </div>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
