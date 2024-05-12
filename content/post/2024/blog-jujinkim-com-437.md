---
title: "[Android] When using Snaphelper"
date: 2024-05-13T00:13:40+09:00
draft: false
---

`SnapHelper`About Us `RecyclerView`It is a convenient class that makes RecyclerView as ViewPager. `SnapHelper`It is an abstract class, and it is usually a `PagerSnapHelper`Use the real implementation class like.  
`PagerSnapHelper`When scrolling to RecyclerView, the viewHolder automatically displays the most of the scrolling.

RecyclerView `ScrollListener`We will use it. logging, or for many reasons that give effect when scrolling.

The problem is that ScrollListener is one external instance, if you need to manage memory, you need to remove it.  
When we are often sleeping `removeOnScrollListener()`About Us `clearOnScrollListeners()`Use, **`SnapHelper`Using RecyclerView `clearOnScrollListeners()`When calling, the snap is broken.**

That's why not `SnapHelper` If you’re looking for an internal code, you’ll see it. `SnapHelper`About Us `flingListener`About Us `scrollListener`About Us `RecyclerView`Because it is true. because it is not managed separately and is just managed as with other listeners, `clearOnScrollListeners()`When calling `SnapHelepr`You can also fly like a lion.

About Us [`SnapHelper.java`](https://android.googlesource.com/platform/frameworks/support/+/oreo-cts-release/v7/recyclerview/src/android/support/v7/widget/SnapHelper.java) The code is part of.


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
Like the code above, `attachToRecyclerView()`When calling the argument, it is beyond `RecyclerView`ScrollListener inside Helper, as well as FlingListener.

But we're not `addOnScrollListener()`It’s not called, and it’s easy to use SnapHelper.  
About Us `SnapHelper`ScrollListener `clear~~Listener`About Us `remove~~Listener` We will do our best for you. or be wary and rejuvenated.

I don’t know this issue, it was a day that I feel again whenever I’m sleeping, I’m still cherished.



Automatically translated using Google Translate and copied by [Truth](https://github.com/jujinkim/truth).
Original post: [https://blog.jujinkim.com/437](https://blog.jujinkim.com/437)