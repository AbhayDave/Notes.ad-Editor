import DOMPurify from "dompurify";
import { useStyles } from "./styles";

// eslint-disable-next-line react/prop-types
function NotePreview({ htmlContentState }) {
  //@ States and Variables:
  const classes = useStyles();
  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  return (
    <div
      className={classes.preview}
      dangerouslySetInnerHTML={createMarkup(htmlContentState)}
    />
  );
}

export default NotePreview;
