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

const DisplayOnPages = (props) => {
  const { title, id, displayOnPagePullData } = props;

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
              multiple keywords. The bar displays if any keyword is matched
            </span>
          }
        />
      ),
    [handleKeywordTextField, keywordTextField]
  );

  const choices = [
    { label: "All pages", value: "all" },
    { label: "Homepage only", value: "home" },
    {
      label: "Only on Page with URL (Copy and Paste the URL below)",
      value: "url",
      renderChildren: renderChildrenForUrl,
    },
    {
      label: "Only on Pages that contain the keyword in their URLs",
      value: "keyword",
      renderChildren: renderChildrenForKeyWord,
    },
  ];

  useEffect(() => {
    let textFieldObj = {};
    let selectedChoice = selected.find((selected) => selected);
    selectedChoice == "url" ? (textFieldObj = { url: urlTextField }) : null;
    selectedChoice == "keyword"
      ? (textFieldObj = { keyword: keywordTextField })
      : null;

    displayOnPagePullData({ selected: selectedChoice, ...textFieldObj });
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

export default DisplayOnPages;
