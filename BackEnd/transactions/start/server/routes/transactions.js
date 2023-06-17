const express = require("express");
const { getLoggedInUserId } = require("../utils");
const db = require("../db");
const { plaidClient } = require("../plaid");
const { setTimeout } = require("timers/promises");
const { SimpleTransaction } = require("../simpleTransactionObject");

const router = express.Router();

/**
 * This will ask our server to make a transactions sync call
 * against all the items it has for a particular user. This is one way
 * you can keep your transaction data up to date, but it's preferable
 * to just fetch data for a single item in response to a webhook.
 */
router.post("/sync", async (req, res, next) => {
  try {
    const userId = getLoggedInUserId(req);
    const items = await db.getItemIdsForUser(userId);
    items.forEach((item) =>{
        syncTransactions(item.id);
    })

  } catch (error) {
    console.log(`Running into an error!`);
    next(error);
  }
});

const fetchNewSyncData = async function (accessToken){
  let keepGoing = false;
  const allData = { added: [], modified: [], removed: [], nextCursor: "CAESJUVYTDRSVjZBQnlGZ0c0ZzRYelF2aUd4Umw2azk2d1Q0QXJLVzYaBgiAlqmkBiIGCICWqaQGKgYIgJappAY=" };
  do{
    const results = await plaidClient.transactionsSync({
      access_token: accessToken,
      //A new option obj added here.
      cursor: allData.nextCursor,
      options:{
       include_personal_finance_category: true,
      },
   });
   const newData = results.data;
   allData.added = allData.added.concat(newData.added);
   allData.modified = allData.modified.concat(newData.modified);
   allData.removed = allData.removed.concat(newData.removed);
   allData.nextCursor = newData.next_cursor;
   keepGoing = newData.has_more;
   console.log(`Added: ${newData.added.length} Modified: ${newData.modified.length} Removed: ${newData.removed.length}`);
  }while (keepGoing == true)
  console.log('All done!');
  console.log(`Your final cursor: ${allData.nextCursor}`);
  return allData;
};

/**
 * Given an item ID, this will fetch all transactions for all accounts
 * associated with this item using the sync API. We can call this manually
 * using the /sync endpoint above, or we can call this in response
 * to a webhook
 */
const syncTransactions = async function (itemId) {
  const summary = { added: 0, removed: 0, modified: 0 };
  const {access_token : accessToken}= await db.getItemInfo(itemId);
  //1. Fetch our most recent cursor from the db.

  //2. Fetch all our transactions since last cursor

  const allData = await fetchNewSyncData(accessToken);
  //3. Add new transactions to our db.

  //4. Updated any modified transactions

  //5. Do sth with removed transactions??

  //6. Save our recent cursor.

  return summary;
};

/**
 * Fetch all the transactions for a particular user (up to a limit)
 * This is really just a simple database query, since our server has already
 * fetched these items using the syncTransactions call above
 *
 */
router.get("/list", async (req, res, next) => {
  try {
    res.json({ todo: "Implement this method" });
  } catch (error) {
    console.log(`Running into an error!`);
    next(error);
  }
});

module.exports = { router, syncTransactions };
