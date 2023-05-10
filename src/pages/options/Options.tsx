import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { get, set } from "@services/storage/storageService";
import { uid } from "@services/uidService";
import "@pages/options/Options.css";
import {
  SETTINGS_DEBUG,
  SETTINGS_KEYWORD_RULES,
  TEXT_OPTIONS,
  TEXT_OPTIONS_DISPLAY_DEBUG,
  TEXT_OPTIONS_SAVED_SUCCESSFULLY,
} from "@src/services/constants";
import Header from "./components/Header";
import KeywordRule, { IKeywordRule } from "./components/KeywordRule";

const theme = createTheme();

export default function Options() {
  const [displayDebug, setDisplayDebug] = useState<boolean>(false);
  const [rules, setRules] = useState<IKeywordRule[]>([]);

  useEffect(() => {
    initForm();
  }, []);

  const initForm = () => {
    get([SETTINGS_DEBUG, SETTINGS_KEYWORD_RULES]).then((result) => {
      setDisplayDebug(result?.[SETTINGS_DEBUG] || false);
      setRules(result?.[SETTINGS_KEYWORD_RULES] || [createRule()]);
    });
  };

  const handleDisplayDebugChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDisplayDebug(event.target.checked);
  };

  const handleAddRule = () => {
    const newRule = createRule();
    setRules([...rules, newRule]);
  };

  const createRule = () => {
    return {
      id: uid(),
      keywords: null,
      cssStyles: null,
      enabledOn: null,
    };
  };

  const handleRuleChange = (rule: IKeywordRule) => {
    const newRules = [...rules];
    const index = newRules.findIndex((item) => item.id === rule.id);
    newRules[index] = { ...newRules[index], ...rule };
    setRules(newRules);
  };

  const handleDeleteRule = (rule: IKeywordRule) => {
    const newRules = rules.filter((item) => item.id !== rule.id);
    if (!newRules.length) {
      newRules.push(createRule());
    }
    setRules(newRules);
  };

  const handleApply = async () => {
    await set({
      [SETTINGS_DEBUG]: displayDebug,
      [SETTINGS_KEYWORD_RULES]: rules,
    });
    alert(TEXT_OPTIONS_SAVED_SUCCESSFULLY);
  };

  const handleCancel = () => initForm();

  const handleReset = () => {
    const newRules = [createRule()];
    setRules(newRules);
    setDisplayDebug(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 2, md: 4 }, p: { xs: 1, md: 2 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            {TEXT_OPTIONS}
          </Typography>

          <Grid
            container
            spacing={2}
            sx={{ my: { xs: 2 } }}
            justifyContent="center"
            alignItems="center"
          >
            {rules.map((rule) => (
              <KeywordRule
                key={rule.id}
                {...rule}
                onRuleChange={handleRuleChange}
                onDeleteRule={handleDeleteRule}
              />
            ))}
          </Grid>

          <Grid container spacing={2} alignItems="center">
            <Grid item xs={6}>
              <Button variant="contained" onClick={handleAddRule}>
                Add Keywords
              </Button>
            </Grid>

            <Grid item xs={6} textAlign="right">
              <FormControlLabel
                control={
                  <Checkbox
                    name="displayDebugPopup"
                    checked={displayDebug}
                    onChange={handleDisplayDebugChange}
                  />
                }
                label={TEXT_OPTIONS_DISPLAY_DEBUG}
              />
            </Grid>
          </Grid>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              onClick={handleApply}
              sx={{ mt: 3, ml: 1 }}
            >
              Apply
            </Button>
            <Button
              variant="outlined"
              onClick={handleCancel}
              sx={{ mt: 3, ml: 1 }}
            >
              Cancel
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={handleReset}
              sx={{ mt: 3, ml: 1 }}
            >
              Reset
            </Button>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
