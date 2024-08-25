package rocks.zipcode.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class AssignmentTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Assignment getAssignmentSample1() {
        return new Assignment().id(1L).name("name1").topic("topic1").courseName("courseName1").description("description1");
    }

    public static Assignment getAssignmentSample2() {
        return new Assignment().id(2L).name("name2").topic("topic2").courseName("courseName2").description("description2");
    }

    public static Assignment getAssignmentRandomSampleGenerator() {
        return new Assignment()
            .id(longCount.incrementAndGet())
            .name(UUID.randomUUID().toString())
            .topic(UUID.randomUUID().toString())
            .courseName(UUID.randomUUID().toString())
            .description(UUID.randomUUID().toString());
    }
}
