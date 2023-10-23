package capstone.manager.data;

import capstone.manager.models.AppUser;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface AppUserRepository {

    AppUser findByUsername(String username);
    AppUser add(AppUser appUser);

}
