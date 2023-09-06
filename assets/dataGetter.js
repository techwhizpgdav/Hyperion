const {google} =   require('googleapis')


const spid = "1Jzcd64EGmuMnnqtdheNIizTqXG0PqZJ1G3ojI6rwBfw";
const auth = new google.auth.GoogleAuth({
    keyFile:"creds.json",
    scopes:"https://www.googleapis.com/auth/spreadsheets"
});

const notices = [];
const achievements = [];
async function dataFetch(){
    const client = await auth.getClient();
    const googleSheets = google.sheets({
        version:"v4",
        auth:client
    });
    const rows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId:spid,
        range:"Sheet1!B:C"
    })
    const Achrows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId:spid,
        range:"Sheet2!B:C"
    })
    const data = rows.data.values; 
    const acdata = Achrows.data.values;
    for(let i =1;i<data.length;i++){
       let notice = {
           link:data[i][0],
           body:data[i][1]
       }
       notices.push(notice)
    }
    for(let i =1;i<acdata.length;i++){
       let achi = {
        socname:acdata[i][0],
        acbody:acdata[i][1]
       }
       achievements.push(achi)
    }
    notices.reverse();
    achievements.reverse()
}

dataFetch();

module.exports = {notices,achievements}
