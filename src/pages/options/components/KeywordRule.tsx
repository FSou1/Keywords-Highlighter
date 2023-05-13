import React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export interface IKeywordRule {
  id: string;
  keywords: string;
  cssStyles: string;
  enabledOn: string;
  highlightCompleteWords: boolean;
}

export type KeywordRuleProps = IKeywordRule & {
  onRuleChange: (rule: IKeywordRule) => void;
  onDeleteRule: (rule: IKeywordRule) => void;
};

export default function KeywordRule(props: KeywordRuleProps) {
  const {
    keywords,
    cssStyles,
    enabledOn,
    highlightCompleteWords,
    onRuleChange,
    onDeleteRule,
  } = props;

  const handleKeywordsChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    onRuleChange({
      ...props,
      keywords: event.target.value,
    });
  };

  const handleCssStylesChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    onRuleChange({
      ...props,
      cssStyles: event.target.value,
    });
  };

  const handleEnabledOnChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    onRuleChange({
      ...props,
      enabledOn: event.target.value,
    });
  };

  const handleHighlightCompleteWordsChange: React.ChangeEventHandler<
    HTMLInputElement
  > = (event) => {
    onRuleChange({
      ...props,
      highlightCompleteWords: event.target.checked,
    });
  };

  const handleDeleteClick = () => {
    onDeleteRule({
      ...props,
    });
  };

  return (
    <>
      <Grid item xs={11}>
        <TextField
          id="keywords"
          label="Keywords"
          value={keywords}
          placeholder="react,remote,principal,staff"
          onChange={handleKeywordsChange}
          fullWidth
        />
      </Grid>

      <Grid item xs={1}>
        <IconButton
          aria-label="delete"
          size="large"
          onClick={handleDeleteClick}
        >
          <DeleteIcon />
        </IconButton>
      </Grid>

      <Grid item xs={6}>
        <TextField
          id="cssstyles"
          label="CSS styles"
          multiline
          rows={3}
          value={cssStyles}
          placeholder="background: red;"
          onChange={handleCssStylesChange}
          fullWidth
        />
      </Grid>

      <Grid item xs={6}>
        <TextField
          id="enabledon"
          label="Enabled on"
          multiline
          rows={3}
          value={enabledOn}
          placeholder="https://www.linkedin.com/"
          onChange={handleEnabledOnChange}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} textAlign="left">
        <FormControlLabel
          control={
            <Checkbox
              name="highlightCompleteWords"
              checked={highlightCompleteWords}
              onChange={handleHighlightCompleteWordsChange}
            />
          }
          label="Only highlight complete words"
        />
      </Grid>

      <Grid item xs={12}>
        <Divider />
      </Grid>
    </>
  );
}
