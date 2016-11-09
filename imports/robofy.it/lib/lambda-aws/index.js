'use strict';

/**
 * This is a sample Lambda function that sends an Email on click of a
 * button. It creates a SNS topic, subscribes an endpoint (EMAIL)
 * to the topic and publishes to the topic.
 *
 * Follow these steps to complete the configuration of your function:
 *
 * 1. Update the EMAIL variable with your email address.
 * 2. Enter a name for your execution role in the "Role name" field.
 *    Your function's execution role needs specific permissions for SNS operations
 *    to send an email. We have pre-selected the "AWS IoT Button permissions"
 *    policy template that will automatically add these permissions.
 */

const AWS = require('aws-sdk');
const LastFmNode = require('lastfm').LastFmNode;

const EMAIL = 'marvin@unplugged.im';  // TODO change me
const SNS = new AWS.SNS({ apiVersion: '2010-03-31' });

function getCurrentTrack() {
  const lastfm = new LastFmNode({
    api_key: '7b6641dae8e8c298932ce2d012a448ac',    // sign-up for a key at http://www.last.fm/api
    secret: '8e57cb5e1908998ba5cdf7789e7e33ac',
    // useragent: 'appname/vX.X MyApp' // optional. defaults to lastfm-node.
  });

  const recentTracks = lastfm.request("user.getRecentTracks", {
    user: "maaarnold",
    limit: 1
  });

  recentTracks.on('success', function(json) {
    console.log('last fm say:');
    console.log(json.recenttracks.track[0]);
  });

  // "appName": "robofy",
  // "apiKey": "7b6641dae8e8c298932ce2d012a448ac",
  // "sharedSecret": "8e57cb5e1908998ba5cdf7789e7e33ac",
  // "registeredTo": "maaarnold"
  return "something I made up"
}

function findExistingSubscription(topicArn, nextToken, cb) {
    const params = {
        TopicArn: topicArn,
        NextToken: nextToken || null,
    };
    SNS.listSubscriptionsByTopic(params, (err, data) => {
        if (err) {
            console.log('Error listing subscriptions.', err);
            return cb(err);
        }
        const subscription = data.Subscriptions.filter((sub) => sub.Protocol === 'email' && sub.Endpoint === EMAIL)[0];
        if (!subscription) {
            if (!data.NextToken) {
                cb(null, null); // indicate that no subscription was found
            } else {
                findExistingSubscription(topicArn, data.NextToken, cb); // iterate over next token
            }
        } else {
            cb(null, subscription); // a subscription was found
        }
    });
}

/**
 * Subscribe the specified EMAIL to a topic.
 */
function createSubscription(topicArn, cb) {
    // check to see if a subscription already exists
    findExistingSubscription(topicArn, null, (err, res) => {
        if (err) {
            console.log('Error finding existing subscription.', err);
            return cb(err);
        }
        if (!res) {
            // no subscription, create one
            const params = {
                Protocol: 'email',
                TopicArn: topicArn,
                Endpoint: EMAIL,
            };
            SNS.subscribe(params, (subscribeErr) => {
                if (subscribeErr) {
                    console.log('Error setting up email subscription.', subscribeErr);
                    return cb(subscribeErr);
                }
                // subscription complete
                console.log(`Subscribed ${EMAIL} to ${topicArn}.`);
                cb(null, topicArn);
            });
        } else {
            // subscription already exists, continue
            cb(null, topicArn);
        }
    });
}

/**
 * Create a topic.
 */
function createTopic(topicName, cb) {
    SNS.createTopic({ Name: topicName }, (err, data) => {
        if (err) {
            console.log('Creating topic failed.', err);
            return cb(err);
        }
        const topicArn = data.TopicArn;
        console.log(`Created topic: ${topicArn}`);
        console.log('Creating subscriptions.');
        createSubscription(topicArn, (subscribeErr) => {
            if (subscribeErr) {
                return cb(subscribeErr);
            }
            // everything is good
            console.log('Topic setup complete.');
            cb(null, topicArn);
        });
    });
}

/**
 * The following JSON template shows what is sent as the payload:
{
    "serialNumber": "GXXXXXXXXXXXXXXXXX",
    "batteryVoltage": "xxmV",
    "clickType": "SINGLE" | "DOUBLE" | "LONG"
}
 *
 * A "LONG" clickType is sent if the first press lasts longer than 1.5 seconds.
 * "SINGLE" and "DOUBLE" clickType payloads are sent for short clicks.
 *
 * For more documentation, follow the link below.
 * http://docs.aws.amazon.com/iot/latest/developerguide/iot-lambda-rule.html
 */
exports.handler = (event, context, callback) => {
    console.log('Received event:', event.clickType);

    // create/get topic
    createTopic('aws-iot-button-sns-topic', (err, topicArn) => {
        if (err) {
            return callback(err);
        }
        console.log(`Publishing to topic ${topicArn}`);
        const subject = getCurrentTrack();
        // publish message
        const params = {
            Message: `${event.serialNumber} -- processed by Lambda\nBattery voltage: ${event.batteryVoltage}`,
            // Subject: `Hello from your IoT Button ${event.serialNumber}: ${event.clickType}`,
            Subject: getCurrentTrack(),
            TopicArn: topicArn,
        };
        // result will go to function callback
        SNS.publish(params, callback);
    });
};
