const { google } = require('googleapis');

class GoogleSheetsApi {
  
  async auth() {
    const auth = await new google.auth.GoogleAuth({
      keyFile: 'key.json',
      scopes: 'https://www.googleapis.com/auth/spreadsheets',
    });
    await auth.getClient();
    const api = google.sheets({
      version: 'v4', client: 'auth',
    });
    return { auth, api };
  }
  
  async read({ spreadsheetId, range }) {
    try {
      const { auth, api } = await this.auth();
      const { data: { values } } = await api.spreadsheets.values.get({
        auth, spreadsheetId, range,
      });
      return values;
    } catch (error) {
      console.log({ success: false, error });
    }
  }
  
  async append({ spreadsheetId, range, values }) {
    try {
      const { auth, api } = await this.auth();
      await api.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range,
        insertDataOption: 'INSERT_ROWS',
        valueInputOption: 'USER_ENTERED',
        resource: { values },
      });
    } catch (error) {
      console.log({ success: false, error });
    }
  }
  
  async update({ spreadsheetId, range, values }) {
    try {
      const { auth, api } = await this.auth();
      await api.spreadsheets.values.update({
        auth,
        spreadsheetId,
        range,
        valueInputOption: 'USER_ENTERED',
        resource: { values },
      });
    } catch (error) {
      console.log({ success: false, error });
    }
  }
  
  async clear({ spreadsheetId, range }) {
    try {
      const { auth, api } = await this.auth();
      await api.spreadsheets.values.clear({
        auth,
        spreadsheetId,
        range,
      });
    } catch (error) {
      console.log({ success: false, error });
    }
  }
  
}

module.exports = new GoogleSheetsApi();
