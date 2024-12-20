package rocks.zipcode.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class UserProfileTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static UserProfile getUserProfileSample1() {
        return new UserProfile().id(1L).name("name1").emailAddress("emailAddress1").password("password1").aboutMe("aboutMe1");
    }

    public static UserProfile getUserProfileSample2() {
        return new UserProfile().id(2L).name("name2").emailAddress("emailAddress2").password("password2").aboutMe("aboutMe2");
    }

    public static UserProfile getUserProfileRandomSampleGenerator() {
        return new UserProfile()
            .id(longCount.incrementAndGet())
            .name(UUID.randomUUID().toString())
            .emailAddress(UUID.randomUUID().toString())
            .password(UUID.randomUUID().toString())
            .aboutMe(UUID.randomUUID().toString());
    }
}
