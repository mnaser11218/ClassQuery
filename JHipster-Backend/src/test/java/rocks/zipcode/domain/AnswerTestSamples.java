package rocks.zipcode.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class AnswerTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Answer getAnswerSample1() {
        return new Answer().id(1L).answer("answer1").liked(1L);
    }

    public static Answer getAnswerSample2() {
        return new Answer().id(2L).answer("answer2").liked(2L);
    }

    public static Answer getAnswerRandomSampleGenerator() {
        return new Answer().id(longCount.incrementAndGet()).answer(UUID.randomUUID().toString()).liked(longCount.incrementAndGet());
    }
}
