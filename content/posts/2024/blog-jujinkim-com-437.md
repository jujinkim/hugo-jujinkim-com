---
title: "[Android] When using Snaphelper, let's manage onscrollistener well."
date: 2024-05-14T01:47:23+09:00
draft: false
---

`SnapHelper` is a convenient class that lets you create RecyclerView as ViewPager. SnapHelper is not a abstract class, and usually uses a real implemented class like `PagerSnapHelper`.  
When you attach PagerSnapHelper to RecyclerView, you can automatically deploy the most viewHolder in the center of the scroll.

But many developers will use ScrollListener to RecyclerView. logging, or for many reasons that give effect when scrolling.

The problem is that ScrollListener is one external instance, if you need to manage memory, you need to remove it.  
In this case, we often use `clearOnScrollListeners()` instead of `removeOnScrollListener()`, `SnapHelper`**In RecyclerView using recyclerView, call clearOnScrollListeners(), and the snap is broken.**

The reason is that if you’re not a huge thing, you’ll see if you’re going to get the SnapHelper inside code, just because SnapHelper is in the recyclerView with flingListener and scrollListener. Since it is not managed separately, and it is managed just like other listeners, call the `clearOnScrollListeners() and the listener with SnapHelper is also called.

About Us[SnapHelper.java](https://android.googlesource.com/platform/frameworks/support/+/oreo-cts-release/v7/recyclerview/src/android/support/v7/widget/SnapHelper.java)The code is part of.


```
public void attachToRecyclerView(@Nullable RecyclerView recyclerView)
        throws IllegalStateException {
    if (mRecyclerView == recyclerView) {
        return; // nothing to do
    }
    if (mRecyclerView != null) {
        destroyCallbacks();
    }
    mRecyclerView = recyclerView;
    if (mRecyclerView != null) {
        setupCallbacks();
        mGravityScroller = new Scroller(mRecyclerView.getContext(),
                new DecelerateInterpolator());
        snapToTargetExistingView();
    }
}

private void setupCallbacks() throws IllegalStateException {
    if (mRecyclerView.getOnFlingListener() != null) {
        throw new IllegalStateException("An instance of OnFlingListener already set.");
    }
    mRecyclerView.addOnScrollListener(mScrollListener);
    mRecyclerView.setOnFlingListener(this);
}
```
Like the above code, call `attachToRecyclerView()` to recyclerView that is beyond the argument, and scrollListener inside Helper, and FlingListener.

But we don’t call `addOnScrollListener()` separately and it’s easy to hit because it’s using SnapHelper.  
Therefore, when using SnapHelper, scrollListener and FlingListener must be managed directly with remove~~Listener, not clear~Listener. or sharpened.

I don’t know this issue, it was a day that I feel again whenever I’m sleeping, I’m still cherished.



---
<small>Automatically translated using Google Translate and copied by [Truth](https://github.com/jujinkim/truth).

Original post: [https://blog.jujinkim.com/437](https://blog.jujinkim.com/437)</small>

---

