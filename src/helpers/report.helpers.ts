import { reportEndpoints } from '~api/config';
import { JSONResponse } from '~types/api';
import { ReportBody } from '~types/api/request.types';
import { ReportResponse } from '~types/api/response.types';

export const createReport = async (report: ReportBody, idToken?: string) => {
  try {
    const url = reportEndpoints.report;

    const headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken || ''}`,
    });

    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(report),
    });

    const result: JSONResponse = await response.json();
    if (response.ok) {
      return (result.data as ReportResponse).report;
    } else {
      throw Error(result.message);
    }
  } catch (error) {
    throw error;
  }
};
