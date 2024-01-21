import { useEffect, useMemo, useState } from "react";
import { useVitePostHog } from "./useVitePostHog";
import { Survey } from "../types";

interface UseGetEnabledSurvey {
  currentSurvey: Survey | null;
  surveyFound: boolean;
  isLoading: boolean;
}

/**
 * Uses getActiveMatchingSurveys to find the survey with the given id.
 * @param surveyId - id of the survey to find
 * @returns
 */
export const useGetEnabledSurvey = (surveyId: string): UseGetEnabledSurvey => {
  const posthog = useVitePostHog();
  const [surveyState, setSurveyState] = useState<UseGetEnabledSurvey>({
    currentSurvey: null,
    surveyFound: false,
    isLoading: true,
  });

  useEffect(() => {
    posthog?.getActiveMatchingSurveys((surveys) => {
      if (surveys.length > 0) {
        const targetSurvey = surveys.find((survey) => survey.id === surveyId);
        if (targetSurvey) {
          setSurveyState({
            currentSurvey: targetSurvey,
            surveyFound: true,
            isLoading: false,
          });
        } else {
          setSurveyState({
            currentSurvey: null,
            surveyFound: false,
            isLoading: false,
          });
        }
      } else {
        setSurveyState({
          currentSurvey: null,
          surveyFound: false,
          isLoading: false,
        });
      }
    }, true);
  }, [posthog, surveyId]);

  const handleDismiss = () => {
    posthog?.capture("survey dismissed", {
      $survey_id: surveyId,
    });
  };

  return useMemo(() => {
    return {
      currentSurvey: surveyState.currentSurvey,
      surveyFound: surveyState.surveyFound,
      isLoading: surveyState.isLoading,
      handleDismiss,
    };
  }, [surveyState]);
};
