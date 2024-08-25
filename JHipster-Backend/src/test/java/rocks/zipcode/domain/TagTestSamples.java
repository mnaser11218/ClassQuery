package rocks.zipcode.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class TagTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Tag getTagSample1() {
        return new Tag().id(1L).tagName("tagName1").tagDescription("tagDescription1").labName("labName1").labTopic("labTopic1");
    }

    public static Tag getTagSample2() {
        return new Tag().id(2L).tagName("tagName2").tagDescription("tagDescription2").labName("labName2").labTopic("labTopic2");
    }

    public static Tag getTagRandomSampleGenerator() {
        return new Tag()
            .id(longCount.incrementAndGet())
            .tagName(UUID.randomUUID().toString())
            .tagDescription(UUID.randomUUID().toString())
            .labName(UUID.randomUUID().toString())
            .labTopic(UUID.randomUUID().toString());
    }
}
