package de.home.tchuensu.GradeManagementServer.services.entity;

import de.home.tchuensu.GradeManagementServer.dao.dto.model.CredentialDto;
import de.home.tchuensu.GradeManagementServer.model.entity.Credential;

public interface CredentialService {

    // Create

    /**
     *
     *  Create credential and persist the newly created credential in the database.
     *
     * @param credentialDto
     * @return
     */
    public Credential create(CredentialDto credentialDto);


    // Read

    /**
     *
     * Return the set of credentials corresponding to the given username
     *
     * @param username
     * @return
     */
    public Credential getByUsername(String username);


    public boolean checkExistsById(Long id);


    // Update

    /**
     *
     * Update the password credential of a given username
     *
     * @param username
     * @param newPassword
     * @return
     */
    public Credential updatePassword(String username, String newPassword);

    // Delete

    // Non CRUD functions

    public String generateUsernames(String firstname, String lastname);
}
