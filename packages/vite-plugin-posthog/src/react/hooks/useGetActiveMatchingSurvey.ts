import { useEffect, useMemo, useState } from "react";
import { useVitePostHog } from "./useVitePostHog";
import { EventMetaData, Survey } from "../../types";

type SurveyState = {
  currentSurvey: Survey | null;
  surveyFound: boolean;
  isLoading: boolean;
};

/**
 * Uses getActiveMatchingSurveys to find the survey with the given id.
 * @param surveyId - id of the survey to find
 * @param eventMetaData - metadata to send with the survey dismissed event
 * @returns
 */
export const useGetActiveMatchingSurvey = (
  surveyId: string,
  eventMetaData?: EventMetaData
): SurveyState => {
  const posthog = useVitePostHog();
  const [surveyState, setSurveyState] = useState<SurveyState>({
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
      ...eventMetaData,
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
