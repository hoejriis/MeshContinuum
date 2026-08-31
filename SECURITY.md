# Security policy

MeshContinuum is in early public development and does not yet publish a supported release line.

Please do not disclose suspected vulnerabilities in a public issue. Use GitHub's private vulnerability reporting or security-advisory mechanism for this repository.

For non-sensitive hardening ideas, open a normal issue.

Never include:

- private keys or broker credentials;
- access tokens;
- real Wi-Fi passwords;
- unredacted device provisioning exports;
- private deployment identifiers not needed to reproduce the problem.

Remote management, backend federation and managed OTA require explicit threat models and reviewed trust contracts. Their presence on a roadmap does not imply that an unfinished implementation is safe for production use.
