import { useState, useCallback, useEffect } from "react";
import {
  TextField,
  ChoiceList,
  ButtonGroup,
  Button,
  Toast,
  Heading,
  FormLayout,
  Layout,
} from "@shopify/polaris";

const ExcludePages = (props) => {
  const { title, id, excludePagePullData } = props;

  const [selected, setSelected] = useState(["all"]);

  const [urlTextField, setUrlTextField] = useState("");
  const handleUrlTextField = useCallback((value) => setUrlTextField(value), []);

  const [keywordTextField, setKeywordTextField] = useState("");
  const handleKeywordTextField = useCallback(
    (value) => setKeywordTextField(value),
    []
  );
  const handleChoiceListChange = useCallback((value) => setSelected(value), []);
  const renderChildrenForUrl = useCallback(
    (isSelected) =>
      isSelected && (
        <TextField
          label={"URL:"}
          labelHidden
          onChange={handleUrlTextField}
          value={urlTextField}
          autoComplete={"off"}
          placeholder={"URL"}
          helpText={
            <span>
              Input the link address above (you can copy and paste the page URL
              directly into the field)
            </span>
          }
        />
      ),
    [handleUrlTextField, urlTextField]
  );

  const renderChildrenForKeyWord = useCallback(
    (isSelected) =>
      isSelected && (
        <TextField
          label={"Keyword:"}
          labelHidden
          onChange={handleKeywordTextField}
          value={keywordTextField}
          autoComplete={"off"}
          placeholder={"Keyword"}
          helpText={
            <span>
              Input the Keywords above. Use commas to separate if there are
              multiple keywords. The bar does not display if any keyword is
              matched.
            </span>
          }
        />
      ),
    [handleKeywordTextField, keywordTextField]
  );

  const choices = [
    { label: "Do NOT exclude any page", value: "no" },
    { label: "Homepage", value: "home" },
    {
      label: "Only exclude Page with URL (Copy and Paste the URL below)",
      value: "url",
      renderChildren: renderChildrenForUrl,
    },
    {
      label: "Only exclude Pages that contain the keyword in their URLs",
      value: "keyword",
      renderChildren: renderChildrenForKeyWord,
    },
  ];

  useEffect(() => {
    excludePagePullData({ selected, urlTextField, keywordTextField });
    /*
    return () => {
      cleanup
    }
    */
  }, [selected, urlTextField, keywordTextField]);

  return (
    <ChoiceList
      title={title}
      id={id}
      choices={choices}
      selected={selected}
      onChange={handleChoiceListChange}
    />
  );
};

export default ExcludePages;
