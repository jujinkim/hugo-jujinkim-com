---
title: "Kotlin에서 LiveData에 담겨진 NonNull타입 객체는 NonNull이 아니다"
date: 2021-12-29T23:11:46+09:00
draft: true
---
&nbsp;Kotlin에서 `nonnull` 변수를 선언하려면, 그냥 선언하면 됩니다. 오히려 코틀린에서는 `nullable`한 변수를 선언하고 다루는 것이 더 귀찮습니다. 일일이 `?`와 `!!`를 붙여야 하거든요. 이것은 개발자에게 되도록이면 `null-safe`한 코드를 사용하도록 유도하며, 정 어쩔 수 없을 때 `nullable`한 객체를 사용하게 될 경우 그 객체를 다룰 때 항상 NPE에 대비해야함을 인지하도록 해줍니다.

&nbsp;문제는, 코틀린의 스타일이 습관화가 되어서 자바 코드와 혼용해서 사용할 경우 실수가 발생할 수 있다는 점입니다. 최근에 제가 생각없이 안드 앱 코드를 짜다가 겪은 일인데요, 바로 `LiveData` 를 사용할 때 입니다.  
&nbsp;대개 `LiveData`를 코틀린에서 직접 사용할 경우 아래처럼 사용합니다.
```kotlin
val somethingLiveData: MutableLiveData<String> = MutableLiveData("")
```

&nbsp;이 `MutableLiveData`가 담는 객체 타입은 `String`입니다. 딱 봐도 `nonnull`로 보입니다. 코틀린이니깐 `null-safe` 하겠지 라고 생각하게 만듭니다. 근데 저거, `null-safe`하지 않습니다. 경험이 많으신 분들은 대충 눈치 까셨을겁니다.  
&nbsp;"뭔 개소리냐, 선언이 `nonnull`로 물음표 안들어갔으니깐 저 LiveData에 있는 객체는 `nonnull` 아니냐"고 생각할 수 있습니다. 저도 생각없이 짤 때 그랬어요. 그런데 애석하게도 아닙니다. 왜냐하면, `LiveData`는 자바 코드거든요. 아래 코드는 `Null cast exception`을 발생시킵니다.
```kotlin
val somethingLiveData: MutableLiveData<String> = MutableLiveData("").apply {
    value = null    // String?이 아님에도 null이 들어간다.
}

somethingLiveData.value as String
```

&nbsp;위 코드를 보면 분명히 LiveData가 담는 타입을 `nonnull`로 선언했음에도 `value = null`이 들어가고 있습니다. 컴파일 에러도 안나고 빌드도 실행도 됩니다. 다만 오류를 뱉을 뿐.. 오히려 `as String`을 린트가 잡지 않아요. 오히려 `liveData.value`를 그냥 막 쓰려고 하면 빨간줄을 그으며 혼냅니다.

&nbsp;`LiveData`는 자바 코드입니다. 따라서 코틀린에서 `nonnull`타입으로 선언을 하더라도 그걸 모릅니다. 코틀린에서 `LiveData`를 어떻게 쓰든, `LiveData`는 자바로 구현된 코드로 처리됩니다.
&nbsp;아래는 `LiveData` 구현 코드중 일부입니다. 직접 안드로이드 스튜디오에서도 확인하실 수 있습니다.
```java
public abstract class LiveData<T> 
    ...

    private volatile Object mData;

    ...

    @MainThread
    protected void setValue(T value) {
        assertMainThread("setValue");
        mVersion++;
        mData = value;
        dispatchingValue(null);
    }

    @SuppressWarnings("unchecked")
    @Nullable
    public T getValue() {
        Object data = mData;
        if (data != NOT_SET) {
            return (T) data;
        }
        return null;
    }

    ...
}
```

&nbsp;대충 위 코드를 보면 `getValue()`에 `@Nullable`이 붙어있음을 알 수 있습니다. 게다가 메서드 안에서는 명시적으로 `return null;`이 써있기까지 합니다.  
&nbsp;코틀린에서 `nonnull`로 `LiveData`를 만들더라도, 자바에서는 그걸 신경쓰지 않습니다. 애초에 자바 언어에서는 신경 쓸 수도 없습니다. 그래서 `LiveData`는 `nullable`한 객체를 다루게 됩니다. 따라서 코틀린에서 `nonnull`로 만든 `LiveData`도 `null`을 리턴할 수 있습니다. 추가로, 이 코드를 Kotlin Bytecode로 뽑아낸 후 Decompile해서 자바 코드로 보면, 그냥 라이브데이터를 만들 때 Raw타입으로 대충 만들고 값을 박는 것을 볼 수 있습니다.

---
&nbsp;그래도 코틀린 코딩 스타일이 습관화가 되고 코틀린만 쓴다면 별 문제 없을것이다 라는 생각이 들 수도 있는데, 문제는 라이브러리를 쓸 경우입니다. 예를들면, `Room` DB 라이브러리에서 DAO를 통해 `Flow`로 가져와서 `asLiveData()`로 값을 감시하고 가져올 수 있는데, 만약 값을 아직 DB에서 가져오지 못한 상태에서 라이브데이터의 value에 접근하면 null을 뱉게 됩니다. 이를 방지하기 위한 몇 가지 방법이 있습니다.

## 1. 항상 의심하고 신경쓴다
&nbsp;어차피 일반적인 상황에서는 `nullable`한 변수에 바로 접근할 경우 컴파일이 되지 않아서 문제를 알아챌 수 있습니다. 하지만 만약 `as String`과 같이 형변환을 시도하거나, `!!`를 붙이는 등 명시적으로 이 변수를 사용하겠다고 한 경우 앱이 죽을 수 있습니다. 그러므로 뭔가 이상하다 싶으면 의심부터 하고 신경을 써봅니다.

## 2. Kotlin 언어로 LiveData 클래스를 한번 감싸서 getValue()를 바꾼다
&nbsp;자주 쓰는 몇몇 `LiveData`를 상속받은 클래스를 만듭니다. 이 때, 코틀린 언어로 만들어서 코틀린의 `nonnull`타입을 활용할 수 있도록 합니다. 예를 들면 `MutableLiveData`의 경우 아래처럼요.
```kotlin
class NonNullMutableLiveData<T>(value: T) : MutableLiveData<T>(value) {
    override fun getValue() = super.getValue()!!
}
```
이렇게 짜면 최소한 개발자가 `setValue(null)` 를 넣는 경우는 방지할 수 있으며, `getValue()` 로 값을 가져왔을 때에도 null check 에러가 뜨지 않습니다. 하지만 `Room` 처럼 외부 라이브러리로부터 만들어진 LiveData까지 다룰 순 없겠죠.

```kotlin


```

## 3. Kotlin 언어로 observe()를 바꾼다
&nbsp;사실 `LiveData`는 `getValue()`로 값을 가져와서 쓰는 것 보다는 `observe()` 를 통해 값이 변화될 때에 대응하는 것에 초점이 맞춰져있습니다. 그래서 가급적이면 위 방법보다는, 그냥 `getValue()`로 값에 접근하는 경우를 최대한 줄이고 `observe()`를 상속클래스에 override하거나, 다른 확장함수로 만들어서 깔끔하게 사용하는 것을 추천드립니다.
```kotlin

```

---

&nbsp;하지만...다들 뭐 아시다시피 개발이라는게 항상 여유롭고 넉넉한 시간 속에서 진행되지는 않습니다. 물론 타이트한 스케쥴에서도 꼼꼼하게 코드리뷰를 한다면 문제를 줄일 수 있겠지만, 대충 경험해보니 사람이라는게 항상 완벽하지는 않더라구요. 저도 위 내용을 직접 앱 사망 이슈를 보면서 알게 됐습니다. 전혀 생각지도 못한 곳에서 앱이 `null`관련 문제로 죽고있었는데, 코드를 까보니 위와 같은 문제였습니다.

&nbsp;아무튼, 이런 것도 있으니 한번쯤 신경 써보는 것도 좋겠습니다.