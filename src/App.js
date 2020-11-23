import React, { useRef } from "react";
import {
  StreamApp,
  NotificationDropdown,
  FlatFeed,
  StatusUpdateForm,
  Activity,
  InfiniteScrollPaginator,
  CommentField,
  CommentList,
  CommentItem,
  LikeButton,
  ActivityFooter,
  NotificationFeed,
  Notification,
  Dropdown,
  Link,
  EmojiPicker,
} from "react-activity-feed";
import GlobalStyle from "./styles/global";
import "react-activity-feed/dist/index.es.css";

const Header = () => (
  <p style={{ margin: 0, padding: 0, backgroundColor: "green" }}>Header</p>
);

const Footer = () => (
  <p style={{ margin: 0, padding: 0, backgroundColor: "green" }}>Footer</p>
);

const Icon = () => (
  <img
    src="https://lh3.googleusercontent.com/S0wT3WlK6_Y8nKy71NEhfC57nPbLxTZkjox02PArpgZReRZ0RHPZ7ms2f8pIgTrcSAWH"
    style={{ width: "30px", height: "30px" }}
    alt=""
  />
);

function App() {
  const containerRef = useRef(null);
  return (
    <div
      ref={containerRef}
      style={{
        maxWidth: "600px",
        // maxHeight: '500px',
        // overflow: 'scroll',
        margin: "0 auto",
      }}
    >
      <StreamApp
        apiKey="ky2gqtxfvafv"
        appId="101208"
        token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoidXNlci1vbmUifQ.IkcNW5gfHyazKMBIbShHLtxqD95W6X82kt_OCg1Hpk4"
      >
        <div
          style={{
            background: "#fff", //#1A1A14
            height: 60,
            borderRadius: 4,
            margin: "10px 0",
            padding: "0 20px",
            boxShadow: "0px 0px 4px rgba(0,0,0,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <h3>React Activity Feed</h3>
          <NotificationDropdown
            doFeedRequest={({ ...e }) => {
              console.log(e, e);
              return e;
            }}
            notify
          />
        </div>
        <FlatFeed
          // feedGroup="user" // or timeline
          feedGroup="timeline_aggregated"
          notify
          options={{ reactions: { recent: true }, withRecentReactions: true }}
        ></FlatFeed>
        {/* <NotificationFeed
          Group={(props) => (
            <Notification
              {...props}
              onClickUser={(user) => console.log(user)}
              onClickNotification={(notification) => console.log(notification)}
            />
          )}
        /> */}
        <StatusUpdateForm feedGroup="timeline_aggregated" />
        <FlatFeed
          // feedGroup="user" // or timeline
          feedGroup="timeline"
          notify
          options={{ reactions: { recent: true }, withRecentReactions: true }}
          Paginator={(props) => (
            <InfiniteScrollPaginator
              useWindow
              threshold={10}
              {...props}
              getScrollParent={() => containerRef}
            />
          )}
          Activity={(activityProps) => {
            const hasSubActivity = Boolean(
              activityProps?.activity?.object?.object
            );
            const activity = hasSubActivity
              ? activityProps?.activity?.object
              : activityProps?.activity;
            return (
              <Activity
                {...activityProps}
                onClickHashtag={(word) => console.log(`clicked on ${word}`)}
                onClickMention={(word) => console.log(`clicked on ${word}`)}
                HeaderRight={() => (
                  <Dropdown>
                    <div>
                      <Link
                        onClick={() => {
                          activityProps.onRemoveActivity(
                            activityProps.activity.id
                          );
                        }}
                      >
                        Remove
                      </Link>
                    </div>
                  </Dropdown>
                )}
                Footer={() => (
                  <React.Fragment>
                    <ActivityFooter {...activityProps} activity={activity} />
                    <CommentField
                      activity={activity}
                      onAddReaction={activityProps.onAddReaction}
                    />
                    <CommentList
                      activityId={activity.id}
                      activityPath={
                        hasSubActivity
                          ? [activityProps.activity.id, "object"]
                          : null
                      }
                      CommentItem={(props) => (
                        <React.Fragment>
                          <CommentItem {...props} />
                          <LikeButton
                            reaction={props.comment}
                            {...activityProps}
                          />
                        </React.Fragment>
                      )}
                    />
                  </React.Fragment>
                )}
              />
            );
          }}
        />
      </StreamApp>
      <GlobalStyle />
    </div>
  );
}

export default App;
