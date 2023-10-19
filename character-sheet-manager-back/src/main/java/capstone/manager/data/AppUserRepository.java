package capstone.manager.data;

import capstone.manager.models.AppUser;

public interface AppUserRepository {
    AppUser findByUsername(String username);
    AppUser add(AppUser appUser);
}
